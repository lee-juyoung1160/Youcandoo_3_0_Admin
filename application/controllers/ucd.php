<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ucd extends MY_Controller {

    public function sales()
    {
        $this->load->layout('ucd/ucd-sales-list');
    }
    public function uses($Route="list")
    {
        switch ($Route)
        {
            case "list" :
                $this->load->layout('ucd/ucd-use-list');
                break;
            case "create":
                $this->load->layout('ucd/ucd-use-create');
                break;
        }
    }
    public function payments()
    {
        $this->load->layout('ucd/ucd-payment-list');
    }

}