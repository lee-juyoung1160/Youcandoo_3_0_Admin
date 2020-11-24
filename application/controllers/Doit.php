<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Doit extends MY_Controller {

    public function index()
    {
        $this->load->layout('doit/doit-list');
    }

    public function v2()
    {
        $this->load->layout('doit/doit-list-v2');
    }

    public function create()
    {
        $this->load->layout('doit/doit-create');
    }

    public function detail()
    {
        $this->load->layout('doit/doit-detail-v2');
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

    public function category($Route = "")
    {
        switch ($Route) {
            case "":
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

     public function talk($Route = "")
     {
         switch ($Route) {
             case "":
                 $this->load->layout('doit/doit-talk-list');
                 break;
             case "detail" :
                 $this->load->layout('doit/doit-talk-detail');
                 break;
         }
      }
}

