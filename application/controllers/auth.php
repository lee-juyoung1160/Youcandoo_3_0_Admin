<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->library('session');
        $this->redis_session = new Redis();
        $this->redis_session->connect($this->config->item('redis_session'));
    }
    public function __destruct()
    {
        // TODO: Implement __destruct() method.
        $this->redis_session->close();
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
        if($this->redis_session->exists("admin:user"))
        {
            $IsExists = $this->redis_session->hExists("admin:user", $UserID);
            if(!$IsExists)
            {
                alert("사용자 정보가 존재하지 않습니다", "/main/login");
                return;
            }

            $UserData = json_decode($this->redis_session->hGet("admin:user", $UserID));
        }
        else
        {
            $Response = $this->getAdminUserData($UserID);
            $UserData = $Response->data;
        }

        if ($Password != $UserData->password) {
            $this->updateFailCount($UserID, 1);
            alert("비밀번호가 일치하지 않습니다", "/main/login");
            return;
        }

        if ($UserData->is_active == "N") {
            alert("로그인 할수 없습니다", "/main/login");
            return;
        }

        $this->setLoginInfo($UserID);
        $this->updateFailCount($UserID, 0);

        // Cookie Set
        $this->load->helper('cookie');
        $cookie = array(
            'name' => 'userid',
            'value' => $UserData->userid,
            'expire' => 60 * 60 * 24 * 365,
            'domain' => '.youcandoo.co.kr',
            'path'   => '/'
        );
        set_cookie($cookie);
        // Session Set
        session_start();
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
    public function setLoginInfo($UserID)
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
            "ip" => $LoginIP
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
        $header = array(
            "Content-Type : application/json",
            "Authorization : 9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7"
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->config->item("api_server_url")."/v1.0/admin/getAdminUserData");
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
            alert($ResponseObj->msg, "/");
            return;
        }
    }
}