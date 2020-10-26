<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ucd extends MY_Controller {

    public function sales()
    {
        $this->load->layout('ucd/ucd-sales-list');
    }

    public function usage()
    {
        $this->load->layout('ucd/ucd-usage-list');
    }

    public function withdraw($Route = "list")
    {
        switch ($Route) {
            case "user" :
                $this->load->layout('ucd/ucd-withdraw-user-v2');
                break;
            case "list":
                $this->load->layout('ucd/ucd-withdraw-list');
                break;
        }
    }

    public function charge($Route = "list")
    {
        switch ($Route) {
            case "list":
                $this->load->layout('ucd/ucd-charge-list');
                break;
        }
    }
    public function cancel($Route = "list")
    {
        switch ($Route) {
            case "user" :
                $this->load->layout('ucd/ucd-cancel-user-v2');
                break;
            case "list":
                $this->load->layout('ucd/ucd-cancel-list');
                break;
        }
    }

    public function create($Route="biz")
    {
        switch ($Route)
        {
            case "biz" :
                $this->load->layout('ucd/ucd-create-biz');
                break;
            case "user":
                $this->load->layout('ucd/ucd-create-user-v2');
                break;
        }
    }

    public function dashboard()
    {
        $this->load->layout('ucd/ucd-dashboard');
    }

}