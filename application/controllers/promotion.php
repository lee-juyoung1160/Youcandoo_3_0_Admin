<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Promotion extends MY_Controller
{

    public function index()
    {
        $this->load->layout('promotion/pro-list');
    }

    public function create()
    {
        $this->load->layout('promotion/pro-create');
    }

    public function detail()
    {
        $this->load->layout('promotion/pro-detail');
    }

    public function update()
    {
        $this->load->layout('promotion/pro-update');
    }

    public function banner()
    {
        $this->load->layout('promotion/pro-banner-list');
    }
}