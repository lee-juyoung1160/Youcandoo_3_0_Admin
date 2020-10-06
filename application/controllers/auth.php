<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->library('session');
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
        if($UserID == "")
        {
            alert("ID 값이 입력되지 않았습니다", "/main/login");
            return;
        }
        if($Password == "")
        {
            alert("Password 값이 입력되지 않았습니다", "/main/login");
            return;
        }

        $Password = hash("sha512",$Password);
        $Response = $this->getAdminUserData($UserID);
        $UserData = $Response->data;
        if ($Password != $UserData->password) {
            $this->updateFailCount($UserID, 1);
            alert("비밀번호가 일치하지 않습니다", "/main/login");
            return;
        }

        if ($UserData->is_active == "N") {
            alert("로그인 할수 없습니다", "/main/login");
            return;
        }

//        if($UserData->mta_yn=="Y"){
//
//            if($UserData->status=="승인대기"){
//                alert("승인되지 않은 사용자입니다", "/main/login");
//                return;
//            }
//            $secret = $UserData->mta_key;
//            if(empty($secret)){
//                require_once APPPATH.'third_party/PHPGangsta/GoogleAuthenticator.php';
//                $ga = new PHPGangsta_GoogleAuthenticator();
//                $secret = $ga->createSecret();
//            }
//            $this->load->view('/login/otp-auth');
//        }

        $this->setLoginInfo($UserID, "");
        $this->updateFailCount($UserID, 0);

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
        session_start();

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
        $body = array("userid" => $UserID);
        $header = array(
            "Content-Type : application/json",
            "Authorization : 9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7"
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->config->item("api_server_url")."/v1.0/admin/getExistsAdminUser");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        $ResponseObj = json_decode($response);
        if($ResponseObj->status != 30000)
        {
            alert($ResponseObj->msg);
            return;
        }

        // qrcode
        require_once APPPATH.'third_party/PHPGangsta/GoogleAuthenticator.php';
        $ga = new PHPGangsta_GoogleAuthenticator();
        $secret = $ga->createSecret();

        $qrCodeUrl = $ga->getQRCodeGoogleUrl('YOUCANDOO', $secret);
        $this->load->view('/login/otp-auth', array(
            "userid"=>$UserID,
            "password"=>hash("sha512",$Password),
            "username"=>$UserName,
            "useremail"=>$UserEmail,
            "qrcode_url"=>$qrCodeUrl,
            "secret"=>$secret,
            "type"=>"join"
        ));

    }

    public function mta(){
        $Secret = $this->input->post('secret');
        $OTP = $this->input->post("otp");
        $Type = $this->input->post("type");

        $checkResult = $this->verify($Secret, $OTP);

        if ($checkResult) {
            if($Type=="login"){

            }else{ // join
                $body = array(
                    "userid" => $this->input->post('userid'),
                    "password"=>$this->input->post("password"),
                    "username"=>$this->input->post("username"),
                    "useremail"=>$this->input->post("useremail"),
                    "secret"=>$Secret
                );
                $header = array(
                    "Content-Type : application/json",
                    "Authorization : 9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7"
                );
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $this->config->item("api_server_url")."/v1.0/admin/admin/create");
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
                curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($ch);
                curl_close($ch);
                $ResponseObj = json_decode($response);
                if($ResponseObj->status != 30000)
                {
                    alert($ResponseObj->msg);
                    return;
                }
                alert("회원가입 되었습니다.","/main/login");
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

        return  $ga->verifyCode($Secret, $OTP, $tolerance);    // 2 = 2*30sec clock tolerance
    }

    private function curl($Header, $Body, $Url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->config->item("api_server_url").$Url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $Header);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($Body));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        $ResponseObj = json_decode($response);
        if($ResponseObj->status != 30000)
        {
            alert($ResponseObj->msg);
            return;
        }
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

        $body = array(
            "userid" => $UserID,
            "ip" => $LoginIP,
            "secret"=>$Secret
        );
        $header = array(
            "Content-Type : application/json",
            "Authorization : 9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7"
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->config->item("api_server_url")."/v1.0/admin/setLoginInfo");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        $ResponseObj = json_decode($response);
        if($ResponseObj->status != 30000)
        {
//            echo json_encode($ResponseObj);
            alert("접속 기록이 정상적으로 처리되지 않았습니다", "/");
            return;
        }
    }

    /**
     * 4. 비밀번호 실패 횟수 업데이트
     */
    public function updateFailCount($UserID, $Count)
    {
        $body = array(
            "userid" => $UserID,
            "count" => $Count
        );
        $header = array(
            "Content-Type : application/json",
            "Authorization : 9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7"
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->config->item("api_server_url")."/v1.0/admin/setFailCount");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        $ResponseObj = json_decode($response);
        if($ResponseObj->status != 30000)
        {
//            echo json_encode($ResponseObj);
            alert("접속 기록이 정상적으로 처리되지 않았습니다", "/");
            return;
        }
    }

    /**
     * 5. Admin 관리자 정보 조회
     */
    public function getAdminUserData($UserID)
    {
        $body = array(
            "userid" => $UserID
        );

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $this->config->item("api_server_url")."/v1.0/admin/getAdminUserData",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS =>json_encode($body),
            CURLOPT_HTTPHEADER => array(
                "Authorization: 9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",
                "Content-Type: application/json"
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        $ResponseObj = json_decode($response);

        if($ResponseObj->status != 30000)
        {
//            echo json_encode($ResponseObj);
            alert($ResponseObj->msg, "/");
            return;
        }
        return $ResponseObj;
    }
}