<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
//        $this->load->library('session');
    }
    public function __destruct()
    {
        // TODO: Implement __destruct() method.
    }

    /**
     * 1. 로그인
     */
    public function login()
    {
        $UserID = $this->input->post("userid");
        $Password = $this->input->post("password");
        if($UserID == "") {
            alert("ID 값이 입력되지 않았습니다", "/main/login");
            return;
        }
        if($Password == "") {
            alert("Password 값이 입력되지 않았습니다", "/main/login");
            return;
        }

        $Password = hash("sha512",$Password);
        $UserData = $this->getAdminUserData($UserID);

        if ($Password != $UserData->password) {
            $this->updateFailCount($UserID, 1);
            alert("비밀번호가 일치하지 않습니다", "/main/login");
            return;
        }

        if ($UserData->is_active == "N") {
            alert("로그인 할수 없습니다", "/main/login");
            return;
        }

        if($UserData->mfa_yn=="Y"){
            if($UserData->status=="승인대기"){
                alert("승인되지 않은 사용자입니다", "/main/login");
                return;
            }
            require_once APPPATH.'third_party/PHPGangsta/GoogleAuthenticator.php';
            $ga = new PHPGangsta_GoogleAuthenticator();
            $secret = empty($UserData->mfa_key)? $ga->createSecret():$UserData->mfa_key;

            $this->load->view('/login/mfa',array(
                "secret"=>$secret,
                "qrcode_url"=>$ga->getQRCodeGoogleUrl('YOUCANDOO', $secret),
                "type"=>"login",
                "userid"=>$UserID
            ));
            return;
        }
        $this->login_after($UserData);
    }

    private function login_after($UserData, $Secret=""){
        $UserID = $UserData->userid;

        if(!$this->setLoginInfo($UserID, $Secret)){
            return;
        }
        if(!$this->updateFailCount($UserID, 0)){
            return;
        }

        // Cookie Set
        $this->load->helper('cookie');
//        $cookie = array(
//            'name' => 'userid',
//            'value' => $UserData->userid,
//            'expire' => 60 * 60 * 24 * 365,
//            'domain' => '.youcandoo.co.kr',
//            'path'   => '/'
//        );
//        set_cookie($cookie);
        // Session Set
//        session_start();

        # 임시처리, 추후 로직 수정 예정 by.leo
        $LoginIP="";
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $LoginIP = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $LoginIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $LoginIP = $_SERVER['REMOTE_ADDR'];
        }
        $UserData->recent_ip = $LoginIP;
        $this->session->set_userdata("user_data", $UserData);
        $_SESSION["user"] = $UserData;
        if(get_cookie('referer'))
        {
            $ReferPage='/'.get_cookie('referer');
            delete_cookie('referer', '.youcandoo.co.kr', '/');
            redirect($ReferPage, 'refresh');
        }
        else
        {
            redirect('/', 'refresh');
        }

    }

    public function join()
    {
        $UserID = $this->input->post("userid");
        $Password = $this->input->post("password");
        $UserName = $this->input->post("username");
        $UserEmail = $this->input->post("useremail");
        $Url = "/main/join";

        if($UserID == "") {
            alert("ID 값이 입력되지 않았습니다", $Url);
            return;
        }
        if($Password == "") {
            alert("Password 값이 입력되지 않았습니다", $Url);
            return;
        }
        if($UserName == "") {
            alert("사용자 이름이 입력되지 않았습니다", $Url);
            return;
        }
        if($UserEmail == "") {
            alert("이메일 값이 입력되지 않았습니다", $Url);
            return;
        }

        // 중복여부
        if(!($this->curl(array("userid" => $UserID), "/admin/getExistsAdminUser"))){
            return;
        }

        // qrcode
        require_once APPPATH.'third_party/PHPGangsta/GoogleAuthenticator.php';
        $ga = new PHPGangsta_GoogleAuthenticator();
        $secret = $ga->createSecret();

        $this->load->view('/login/mfa', array(
            "userid"=>$UserID,
            "password"=>hash("sha512",$Password),
            "username"=>$UserName,
            "useremail"=>$UserEmail,
            "qrcode_url"=>$ga->getQRCodeGoogleUrl('YOUCANDOO', $secret),
            "secret"=>$secret,
            "type"=>"join"
        ));

    }

    public function mfa(){
        $Secret = $this->input->post('secret');
        $OTP = $this->input->post("otp");
        $Type = $this->input->post("type");
        $UserID = $this->input->post("userid");
        $checkResult = $this->verify($Secret, $OTP);

        if ($checkResult) {
            if($Type=="login"){
                $UserData = $this->getAdminUserData($UserID);
                $this->login_after($UserData,$Secret);
            }else{ // join
                $Body = array(
                    "userid" => $UserID,
                    "password"=>$this->input->post("password"),
                    "username"=>$this->input->post("username"),
                    "useremail"=>$this->input->post("useremail"),
                    "secret"=>$Secret
                );
                if($this->curl($Body, "/admin/create")){
                    alert("회원가입 되었습니다.","/main/login");
                }
            }

        } else {
            alert("인증번호를 확인해주세요");
        }
    }

    private function verify($Secret, $OTP){
        $tolerance = 0;
        //Every otp is valid for 30 sec.
        // If somebody provides OTP at 29th sec, by the time it reaches the server OTP is expired.
        //So we can give tolerance =1, it will check current  & previous OTP.
        // tolerance =2, verifies current and last two OTPS

        require_once APPPATH.'third_party/PHPGangsta/GoogleAuthenticator.php';
        $ga = new PHPGangsta_GoogleAuthenticator();

        return $ga->verifyCode($Secret, $OTP, $tolerance);    // 2 = 2*30sec clock tolerance
    }

    private function curl($Body, $Url){

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $this->config->item('api_server_url').$Url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode($Body),
            CURLOPT_HTTPHEADER => array(
                "Authorization: 9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",
                "Content-Type: application/json"
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        $ResponseObj = json_decode($response);

        $Success = ($ResponseObj->status == 0);
        if($ResponseObj->status != 0) {
            alert($ResponseObj->msg);
        }
        return (isset($ResponseObj->data))? $ResponseObj->data: $Success;
    }

    /**
     * 2. 로그아웃
     */
    public function logout()
    {
        $this->session->sess_destroy();
        redirect("/", 'refresh');
    }
    public function check()
    {
        echo hash("sha512", "user100");
    }

    /**
     * 3. 접속 기록 업데이트
     */
    public function setLoginInfo($UserID, $Secret="")
    {
        $LoginIP="";
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $LoginIP = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $LoginIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $LoginIP = $_SERVER['REMOTE_ADDR'];
        }

        $Body = array("userid" => $UserID, "ip" => $LoginIP, "secret"=>$Secret);

        return $this->curl($Body, "/admin/setLoginInfo");
    }

    /**
     * 4. 비밀번호 실패 횟수 업데이트
     */
    public function updateFailCount($UserID, $Count)
    {
        return $this->curl(array("userid" => $UserID, "count" => $Count), "/admin/setFailCount");
    }

    /**
     * 5. Admin 관리자 정보 조회
     */
    public function getAdminUserData($UserID)
    {
        return $this->curl(array("userid" => $UserID), "/admin/getAdminUserData");
    }
}
