<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operate extends MY_Controller {

    public function version()
    {
        $this->load->layout('v1/operate/version-list');
    }

    public function dashboard($version = "")
    {
        if (empty($version))
            $this->load->layout('v1/main-dashboard');
        else
            $this->load->layout('v1/main-dashboard-v2');
    }

    public function account($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('v1/operate/account-list');
                break;
            case "detail":
                $this->load->layout('v1/operate/account-detail');
                break;
        }
    }

    public function log($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('v1/operate/log-dashboard');
                break;
            case "api_list":
                $data['url'] = $this->input->post('url');
                $this->load->layout('v1/operate/log-api-list', $data);
                break;
            case "api_url":
                $this->load->layout('v1/operate/log-api-url');
                break;
            case "api_php_error":
                $this->load->layout('v1/operate/log-api-php-error');
                break;
            case "api_apache_error":
                $this->load->layout('v1/operate/log-api-apache-error');
                break;
            case "api_process":
                $this->load->layout('v1/operate/log-api-process');
                break;
        }
    }

}