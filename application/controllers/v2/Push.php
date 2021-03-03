<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Push extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/push/push-list');
    }

    public function create()
    {
        $this->load->template('v2/push/push-create');
    }


}