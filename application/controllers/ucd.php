<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ucd extends MY_Controller {

    public function sales()
    {
        $this->load->layout('ucd/ucd-sales-list');
    }

    public function uses()
    {
        $this->load->layout('ucd/ucd-use-list');
    }

    public function withdraw()
    {
        $this->load->layout('ucd/ucd-withdraw-list');
    }

    public function create($Route="biz")
    {
        switch ($Route)
        {
            case "biz" :
                $this->load->layout('ucd/ucd-create-biz');
                break;
            case "user":
                $this->load->layout('ucd/ucd-create-user');
                break;
        }
    }

}