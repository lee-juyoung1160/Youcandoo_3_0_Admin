<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Promotion extends MY_Controller
{

    public function index()
    {
        $this->load->layout('v1/promotion/pro-list');
    }

    public function create()
    {
        $this->load->layout('v1/promotion/pro-create');
    }

    public function detail()
    {
        $this->load->layout('v1/promotion/pro-detail');
    }

    public function update()
    {
        $this->load->layout('v1/promotion/pro-update');
    }

    public function banner()
    {
        $this->load->layout('v1/promotion/pro-banner-list');
    }

    public function brand()
    {
        $this->load->layout('v1/promotion/brand-pro-list');
    }

}