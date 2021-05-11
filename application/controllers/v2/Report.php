<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Report extends MY_Controller {

    public function action()
    {
        $this->load->template('v2/report/action-list');
    }

    public function talk($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->template('v2/report/talk-list');
                break;
            case "detail_talk" :
                $this->load->template('v2/report/talk-detail');
                break;
            case "detail_action" :
                $this->load->template('v2/report/talk-detail-action');
                break;
        }
    }

}


