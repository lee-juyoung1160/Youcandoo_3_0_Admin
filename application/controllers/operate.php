<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Operate extends MY_Controller
{

    public function version()
    {
        $this->load->layout('version/app-version-list');
    }

}