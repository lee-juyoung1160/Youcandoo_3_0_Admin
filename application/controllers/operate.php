<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operate extends MY_Controller {

    public function version()
    {
        $this->load->layout('operate/version-list');
    }

    public function dashboard()
    {
        $this->load->layout('operate/main-dashboard-v2');
    }

    public function account()
    {
        $this->load->layout('operate/account-list');
    }
}