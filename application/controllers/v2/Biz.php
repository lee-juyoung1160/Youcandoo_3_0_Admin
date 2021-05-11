<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Biz extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/biz/biz-list');
    }

    public function create()
    {
        $this->load->template('v2/biz/biz-create');
    }

    public function detail()
    {
        $this->load->template('v2/biz/biz-detail');
    }

    public function update()
    {
        $this->load->template('v2/biz/biz-update');
    }

}