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

    public function login()
    {
        $UserID = $this->input->post("userid");
        $Password = $this->input->post("password");
        if($UserID == "")
        {
            alert("ID 값이 입력되지 않았습니다", "/");
            return;
        }
        if($Password == "")
        {
            alert("Password 값이 입력되지 않았습니다", "/");
            return;
        }
        $IsExists = $this->redis_session->hExists("admin:user", $UserID);
        if(!$IsExists)
        {
            alert("사용자 정보가 존재하지 않습니다", "/");
            return;
        }
        $UserData = json_decode($this->redis_session->hGet("admin:user", $UserID));
        if($Password != $UserData->password)
        {
            alert("비밀번호가 일치하지 않습니다", "/");
            return;
        }
        $this->session->set_userdata("user_data", $UserData);
        redirect('http://noocgs.kakaokids.org/pro/lists', 'refresh');
    }

    public function logout()
    {
        $this->session->sess_destroy();
        redirect('http://noocgs.kakaokids.org/', 'refresh');
    }

}