<?php
/**
 * Created by PhpStorm.
 * User: david
 * Date: 2019-01-30
 * Time: 08:46
 */
class MY_Controller extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
    }

    function __destruct()
    {
        $this->load->library('session');

        $UserID = "";
        $IP = "";
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $IP = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $IP = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $IP = $_SERVER['REMOTE_ADDR'];
        }

        $UserData = $this->session->userdata('user_data');
        if(!empty($UserData))
            $UserID = $UserData->userid;

        // --------------------------------------------
        // Admin Access Log
        // --------------------------------------------
        $this->load->library('session');
        $this->redis_session = new Redis();
        $this->redis_session->connect($this->config->item('redis_session'));
        $AccessLog["url"] = (isset($_SERVER['REQUEST_URI']))?$_SERVER['REQUEST_URI']:"";
        $AccessLog["apache_header"] = apache_request_headers();
        $AccessLog["header"] = $_SERVER;
        $AccessLog["body"] = "";
        $AccessLog["response"] = "";
        $AccessLog["datetime"] = date("Y-m-d H:i:s");
        $AccessLog["userid"] = $UserID;
        $AccessLog["ip"] = $IP;
        /*$this->redis_session->lPush("admin:log", json_encode($AccessLog));*/
        $this->redis_session->close();
    }
}