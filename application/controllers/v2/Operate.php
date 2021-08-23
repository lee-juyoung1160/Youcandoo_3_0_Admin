<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operate extends MY_Controller {

    public function error()
    {
        $this->load->template('v2/operate/error-list');
    }

    public function encryption()
    {
        $this->load->template('v2/operate/encryption');
    }

     public function version($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->template('v2/operate/version-list');
                break;
            case "create" :
                $this->load->template('v2/operate/version-create');
                break;
        }
    }

    public function logs()
    {
        $this->load->template('v2/operate/log-list');
    }

}


