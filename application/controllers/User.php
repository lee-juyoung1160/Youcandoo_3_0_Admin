<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MY_Controller {

    function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $this->load->layout('v1/user/user-list');
    }

    public function detail()
    {
        $this->load->layout('v1/user/user-detail');
    }
}