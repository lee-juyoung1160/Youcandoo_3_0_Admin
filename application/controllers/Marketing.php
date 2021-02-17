<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Marketing extends CI_Controller {

    public function event($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('v1/marketing/event-list');
                break;
            case "create" :
                $this->load->layout('v1/marketing/event-create');
                break;
            case "detail":
                $this->load->layout('v1/marketing/event-detail');
                break;
            case "update":
                $this->load->layout('v1/marketing/event-update');
                break;
        }
    }

    public function push($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('v1/marketing/push-list');
                break;
            case "create" :
                $data['req_page'] = $this->input->post('req_page');
                $data['page_uuid'] = $this->input->post('page_uuid');
                $data['req_content'] = $this->input->post('req_content');
                $this->load->layout('v1/marketing/push-create', $data);
                break;
        }
    }

    public function popup($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('v1/marketing/popup-list');
                break;
            case "create" :
                $this->load->layout('v1/marketing/popup-create');
                break;
            case "detail":
                $this->load->layout('v1/marketing/popup-detail');
                break;
        }
    }

    public function inflow()
    {
        $this->load->layout('v1/marketing/inflow');
    }

}