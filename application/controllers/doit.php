<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Doit extends MY_Controller {

    public function doit($Route = "list")
    {
        switch ($Route) {
            case "list":
                $this->load->layout('doit/doit-list');
                break;
            case "create" :
                $this->load->layout('doit/doit-create');
                break;
            case "detail":
                $this->load->layout('doit/doit-detail');
                break;
            case "update":
                $this->load->layout('doit/doit-update');
                break;
        }
    }

    public function recommend()
    {
        $this->load->layout('doit/doit-recommend-list');
    }


    public function category($Route = "list")
    {
        switch ($Route) {
            case "list":
                $this->load->layout('doit/doit-category-list');
                break;
            case "create" :
                $this->load->layout('doit/doit-category-create');
                break;

        }

     }
}

