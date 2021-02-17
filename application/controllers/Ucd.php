<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ucd extends MY_Controller {

    public function sales()
    {
        $this->load->layout('v1/ucd/ucd-sales-list');
    }

    public function usage()
    {
        $this->load->layout('v1/ucd/ucd-usage-list');
    }

    public function withdraw($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('v1/ucd/ucd-withdraw-list');
                break;
            case "user" :
                $this->load->layout('v1/ucd/ucd-withdraw-user');
                break;
        }
    }

    public function charge()
    {
        $this->load->layout('v1/ucd/ucd-charge-list');
    }

    public function cancel($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('v1/ucd/ucd-cancel-list');
                break;
            case "user" :
                $this->load->layout('v1/ucd/ucd-cancel-user');
                break;
        }
    }

    public function create($Route="biz")
    {
        switch ($Route)
        {
            case "biz" :
                $this->load->layout('v1/ucd/ucd-create-biz');
                break;
            case "user":
                $this->load->layout('v1/ucd/ucd-create-user');
                break;
        }
    }

    public function dashboard()
    {
        $this->load->layout('v1/ucd/ucd-dashboard');
    }

}