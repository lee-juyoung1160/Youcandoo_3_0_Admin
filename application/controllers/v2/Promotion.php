<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Promotion extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/promotion/promotion-list');
    }
     public function create()
    {
        $this->load->template('v2/promotion/promotion-create');
    }
     public function update()
    {
        $this->load->template('v2/promotion/promotion-update');
    }
     public function detail()
    {
        $this->load->template('v2/promotion/promotion-detail');
    }

}


