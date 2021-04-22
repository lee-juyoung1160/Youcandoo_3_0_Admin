<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operate extends MY_Controller {

    public function error()
    {
        $this->load->template('v2/operate/error-list');
    }

    public function test()
        {
            $this->load->template('v2/operate/test');
        }

}


