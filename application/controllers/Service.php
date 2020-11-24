<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service extends MY_Controller {

    public function notice($Route="")
    {
        switch ($Route)
        {
            case "" :
                $this->load->layout('service/notice-list');
                break;
            case "create":
                $this->load->layout('service/notice-create');
                break;
            case "update":
                $this->load->layout('service/notice-update');
                break;
            case "detail":
                $this->load->layout('service/notice-detail');
                break;
        }
    }

    public function faq($Route="")
    {
        switch ($Route)
        {
            case "" :
                $this->load->layout('service/faq-list');
                break;
            case "create":
                $this->load->layout('service/faq-create');
                break;
            case "update":
                $this->load->layout('service/faq-update');
                break;
            case "detail":
                $this->load->layout('service/faq-detail');
                break;
            case "sort":
                $this->load->layout('service/faq-sort');
                break;
        }
    }

    public function review()
    {
        $this->load->layout('service/review-list');
    }

    public function action()
    {
        $this->load->layout('service/action-list');
    }

    public function prohibition()
    {
        $this->load->layout('service/prohibited-list');
    }

    public function version()
    {
        $this->load->layout('service/version-list');
    }


    public function inquiry($Route="")
    {
        switch ($Route)
        {
            case "" :
                $this->load->layout('service/inquiry-list');
                break;
            case "update":
                $this->load->layout('service/inquiry-update');
                break;
            case "detail":
                $this->load->layout('service/inquiry-detail');
                break;
        }
    }


}