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

    public function log($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('operate/log-dashboard');
                break;
            case "api_list":
                $data['unique_id'] = $this->input->post('unique_id');
                $this->load->layout('operate/log-api-list', $data);
                break;
            case "api_url":
                $this->load->layout('operate/log-api-url');
                break;
            case "api_php_error":
                $this->load->layout('operate/log-api-php-error');
                break;
            case "api_apache_error":
                $this->load->layout('operate/log-api-apache-error');
                break;
            case "api_process":
                $this->load->layout('operate/log-api-process');
                break;
        }
    }

}