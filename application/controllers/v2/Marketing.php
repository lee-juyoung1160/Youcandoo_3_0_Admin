<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Marketing extends MY_Controller {

    public function banner($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->template('v2/marketing/banner-list');
                break;
            case "create" :
                $this->load->template('v2/marketing/banner-create');
                break;
        }
    }

    public function event($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->template('v2/marketing/event-list');
                break;
            case "create" :
                $this->load->template('v2/marketing/event-create');
                break;
            case "detail":
                $this->load->template('v2/marketing/event-detail');
                break;
            case "update":
                $this->load->template('v2/marketing/event-update');
                break;
        }
    }

    public function push($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->template('v2/marketing/push-list');
                break;
            case "create" :
                $this->load->template('v2/marketing/push-create');
                break;
        }
    }

    public function popup($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->template('v2/marketing/popup-list');
                break;
            case "create" :
                $this->load->template('v2/marketing/popup-create');
                break;
            case "detail":
                $this->load->template('v2/marketing/popup-detail');
                break;
        }
    }

}