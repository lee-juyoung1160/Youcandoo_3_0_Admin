<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service extends CI_Controller {

    public function notice($Route="list")
    {
        switch ($Route)
        {
            case "list" :
                $this->load->layout('notice/notice-list');
                break;
            case "create":
                $this->load->layout('notice/notice-create');
                break;
            case "update":
                $this->load->layout('notice/notice-update');
                break;
            case "detail":
                $this->load->layout('notice/notice-detail');
                break;
        }
    }

    public function faq($Route="list")
    {
        switch ($Route)
        {
            case "list" :
                $this->load->layout('faq/faq-list');
                break;
            case "create":
                $this->load->layout('faq/faq-create');
                break;
            case "update":
                $this->load->layout('faq/faq-update');
                break;
            case "detail":
                $this->load->layout('faq/faq-detail');
                break;
        }
    }

    public function event($Route="list")
    {
        switch ($Route)
        {
            case "list" :
                $this->load->layout('event/event-list');
                break;
            case "create":
                $this->load->layout('event/event-create');
                break;
            case "update":
                $this->load->layout('event/event-update');
                break;
            case "detail":
                $this->load->layout('event/event-detail');
                break;
        }
    }

    public function inquiry($Route="list")
    {
        switch ($Route)
        {
            case "list" :
                $this->load->layout('inquiry/inquiry-list');
                break;
            case "create":
                $this->load->layout('inquiry/inquiry-create');
                break;
            case "update":
                $this->load->layout('inquiry/inquiry-update');
                break;
            case "detail":
                $this->load->layout('inquiry/inquiry-detail');
                break;
        }
    }

    public function prohibition()
    {
        $this->load->layout('prohibited/prohibited-list');
    }
}