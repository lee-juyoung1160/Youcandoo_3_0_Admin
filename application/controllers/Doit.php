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

    public function recommend($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('doit/doit-recommend-list');
                break;
            case "v2" :
                $this->load->layout('doit/doit-recommend-list-v2');
                break;
            case "create" :
                $this->load->layout('doit/doit-recommend-create');
                break;
            case "update" :
                $this->load->layout('doit/doit-recommend-update');
                break;
        }
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
            case "detail" :
                $this->load->layout('doit/doit-category-detail');
                break;
            case "update" :
                $this->load->layout('doit/doit-category-update');
                break;
        }
     }

     public function v2()
     {
         $this->load->layout('doit/doit-list-v2');
     }
}

