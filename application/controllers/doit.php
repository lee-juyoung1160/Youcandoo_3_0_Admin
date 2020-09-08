<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Doit extends MY_Controller {

    public function index()
    {
        $this->load->layout('doit/doit-list');
    }

    public function create()
    {
        $this->load->layout('doit/doit-create');
    }

    public function detail()
    {
        $this->load->layout('doit/doit-detail');
    }

    public function update()
    {
        $this->load->layout('doit/doit-update');
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

