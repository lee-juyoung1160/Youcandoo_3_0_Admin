<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operate extends MY_Controller {

    public function version()
    {
        $this->load->layout('operate/version-list');
    }

    public function dashboard($version = "")
    {
        if (empty($version))
            $this->load->layout('main-dashboard');
        else
            $this->load->layout('main-dashboard-v2');
    }

    public function account($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('operate/account-list');
                break;
            case "detail":
                $this->load->layout('operate/account-detail');
                break;
        }
    }

    public function log($Route = "main")
    {
        switch ($Route) {
            case "main":
                $this->load->layout('operate/log-dashboard');
                break;
            case "url":
                $this->load->layout('operate/log-list');
                break;
            case "php":
                $this->load->layout('operate/log-php');
                break;
            case "apache":
                $this->load->layout('operate/log-apache');
                break;
            case "process":
                $this->load->layout('operate/log-process');
                break;
        }
    }

    public function logs()
    {
        $this->load->layout('operate/log-list');
    }



}