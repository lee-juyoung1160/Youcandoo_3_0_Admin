<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service extends MY_Controller {

    public function notice($Route="")
    {
        switch ($Route)
        {
            case "" :
                $this->load->layout('v1/service/notice-list');
                break;
            case "create":
                $this->load->layout('v1/service/notice-create');
                break;
            case "update":
                $this->load->layout('v1/service/notice-update');
                break;
            case "detail":
                $this->load->layout('v1/service/notice-detail');
                break;
        }
    }

    public function faq($Route="")
    {
        switch ($Route)
        {
            case "" :
                $this->load->layout('v1/service/faq-list');
                break;
            case "create":
                $this->load->layout('v1/service/faq-create');
                break;
            case "update":
                $this->load->layout('v1/service/faq-update');
                break;
            case "detail":
                $this->load->layout('v1/service/faq-detail');
                break;
            case "sort":
                $this->load->layout('v1/service/faq-sort');
                break;
        }
    }

    public function review()
    {
        $this->load->layout('v1/service/review-list');
    }

    public function action()
    {
        $this->load->layout('v1/service/action-list');
    }

    public function prohibition()
    {
        $this->load->layout('v1/service/prohibited-list');
    }

    public function version()
    {
        $this->load->layout('v1/service/version-list');
    }


    public function inquiry($Route="")
    {
        switch ($Route)
        {
            case "" :
                $this->load->layout('v1/service/inquiry-list');
                break;
            case "update":
                $this->load->layout('v1/service/inquiry-update');
                break;
            case "detail":
                $this->load->layout('v1/service/inquiry-detail');
                break;
        }
    }

}