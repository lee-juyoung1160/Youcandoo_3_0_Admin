<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service extends MY_Controller {

    public function notice($Route="")
    {
        switch ($Route)
        {
            case "" :
                $this->load->template('v2/service/notice-list');
                break;
            case "create":
                $this->load->template('v2/service/notice-create');
                break;
            case "update":
                $this->load->template('v2/service/notice-update');
                break;
            case "detail":
                $this->load->template('v2/service/notice-detail');
                break;
        }
    }

    public function faq($Route="")
    {
        switch ($Route)
        {
            case "" :
                $this->load->template('v2/service/faq-list');
                break;
            case "create":
                $this->load->template('v2/service/faq-create');
                break;
            case "update":
                $this->load->template('v2/service/faq-update');
                break;
            case "detail":
                $this->load->template('v2/service/faq-detail');
                break;
            case "sort":
                $this->load->template('v1/service/faq-sort');
                break;
        }
    }

    public function prohibition($Route="")
        {
            switch ($Route)
            {
                case "" :
                    $this->load->template('v2/service/prohibition-list');
                    break;
            }
        }



}