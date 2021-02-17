<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends MY_Controller
{

    public function index()
    {
        $this->load->layout('v1/admin/admin-list');
    }

    public function create()
    {
        $this->load->layout('v1/admin/admin-create');
    }

    public function detail()
    {
        $this->load->layout('v1/admin/admin-detail');
    }

    public function update()
    {
        $this->load->layout('v1/admin/admin-update');
    }

    public function myPage()
    {
        $this->load->layout('v1/admin/admin-mypage');
    }

    public function auth()
    {
        $this->load->layout('v1/admin/admin-auth-create');
    }

    public function log()
    {
        $this->load->layout('v1/admin/admin-log');
    }

    public function deploy()
    {
        $this->load->layout('v1/admin/deploy');
    }

}