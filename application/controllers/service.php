<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service extends MY_Controller {

    public function notice($Route="list")
    {
        switch ($Route)
        {
            case "list" :
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

    public function faq($Route="list")
    {
        switch ($Route)
        {
            case "list" :
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
        }
    }

    public function event($Route="list")
    {
        switch ($Route)
        {
            case "list" :
                $this->load->layout('service/event-list');
                break;
            case "create":
                $this->load->layout('service/event-create');
                break;
            case "update":
                $this->load->layout('service/event-update');
                break;
            case "detail":
                $this->load->layout('service/event-detail');
                break;
        }
    }

    public function inquiry($Route="list")
    {
        switch ($Route)
        {
            case "list" :
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

    public function prohibition()
    {
        $this->load->layout('service/prohibited-list');
    }

    public function review()
    {
        $this->load->layout('service/review-list');
    }

    public function action()
    {
        $this->load->layout('service/action-list');
    }

}