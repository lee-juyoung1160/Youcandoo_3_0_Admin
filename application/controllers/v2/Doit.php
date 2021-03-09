<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Doit extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/doit/doit-list');
    }

    public function create()
    {
        $this->load->template('v2/doit/doit-create');
    }

    public function detail()
    {
        $this->load->template('v2/doit/doit-detail');
    }

    public function pick($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->template('v2/doit/pick-doit-list');
                break;
            case "create" :
                $this->load->template('v2/doit/pick-doit-create');
                break;
            case "update":
                $this->load->template('v2/doit/pick-doit-update');
                break;
        }
    }

    public function category($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->template('v2/doit/category-list');
                break;
            case "create" :
                $this->load->template('v2/doit/category-create');
                break;
            case "detail":
                $this->load->template('v2/doit/category-detail');
                break;
            case "update":
                $this->load->template('v2/doit/category-update');
                break;
        }
    }

}


