<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Gift extends MY_Controller
{

    public function index()
    {
        $this->load->layout('v1/gift/gift-list');
    }

    public function dashboard()
    {
        $this->load->layout('v1/gift/gift-dashboard');
    }

    public function create()
    {
        $this->load->layout('v1/gift/gift-create');
    }

    public function update()
    {
        $this->load->layout('v1/gift/gift-update');
    }

    public function detail()
    {
        $this->load->layout('v1/gift/gift-detail');
    }

    public function apply()
    {
        $this->load->layout('v1/gift/gift-apply-list');
    }

    public function send()
    {
        $this->load->layout('v1/gift/gift-send-list');
    }

}
