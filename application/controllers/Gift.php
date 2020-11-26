<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Gift extends MY_Controller
{

    public function index()
    {
        $this->load->layout('gift/gift-list');
    }

    public function create()
    {
        $this->load->layout('gift/gift-create');
    }

    public function update()
    {
        $this->load->layout('gift/gift-update');
    }

    public function detail()
    {
        $this->load->layout('gift/gift-detail');
    }

    public function apply()
    {
        $this->load->layout('gift/gift-apply-list');
    }

    public function approval()
    {
        $this->load->layout('gift/gift-approval-list');
    }

    public function send()
    {
        $this->load->layout('gift/gift-send-list');
    }

}
