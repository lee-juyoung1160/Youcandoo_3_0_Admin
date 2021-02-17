<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Biz extends MY_Controller
{

    public function index()
    {
        $this->load->layout('v1/biz/biz-list');
    }

    public function create()
    {
        $this->load->layout('v1/biz/biz-create');
    }

    public function detail()
    {
        $this->load->layout('v1/biz/biz-detail');
    }

    public function update()
    {
        $this->load->layout('v1/biz/biz-update');
    }

}