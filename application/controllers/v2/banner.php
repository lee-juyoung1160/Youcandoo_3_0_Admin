<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Banner extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/banner/banner-list');
    }
    public function create()
    {
        $this->load->template('v2/banner/banner-create');
    }


}


