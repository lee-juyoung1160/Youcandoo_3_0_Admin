<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operate extends MY_Controller {

    public function version()
    {
        $this->load->layout('operate/version-list');
    }

}