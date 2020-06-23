<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Marketing extends CI_Controller {

    public function event($Route="lists")
    {
        switch ($Route)
        {
            case "lists":
                $this->load->layout('marketing/event-list');
                break;
            case "create" :
                $this->load->layout('marketing/event-create');
                break;
            case "detail":
                $this->load->layout('marketing/event-detail');
                break;
            case "update":
                $this->load->layout('marketing/event-update');
                break;
        }
    }

    public function push($Route="lists")
    {
        switch ($Route)
        {
            case "lists":
                $this->load->layout('marketing/push-list');
                break;
            case "create" :
                $this->load->layout('marketing/push-create');
                break;
            case "detail":
                $this->load->layout('marketing/push-detail');
                break;
            case "update":
                $this->load->layout('marketing/push-update');
                break;
        }
    }
}