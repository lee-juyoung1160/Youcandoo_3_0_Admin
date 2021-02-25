<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Warning extends MY_Controller {

    public function index()
        {
            $this->load->template('v2/warning/auth-list');
        }

    public function talk()
        {
            $this->load->template('v2/warning/talk-list');
        }

}


