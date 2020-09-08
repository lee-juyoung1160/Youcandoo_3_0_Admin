<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Marketing extends CI_Controller {

    public function event($Route = "list")
    {
        switch ($Route) {
            case "list":
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

    public function push($Route = "list")
    {
        switch ($Route) {
            case "list":
                $this->load->layout('marketing/push-list');
                break;
            case "create" :
                $data['req_page'] = $this->input->post('req_page');
                $data['page_uuid'] = $this->input->post('page_uuid');
                $data['req_content'] = $this->input->post('req_content');
                $this->load->layout('marketing/push-create', $data);
                break;
        }
    }

    public function inflow()
    {
        $this->load->layout('marketing/inflow');
    }

}