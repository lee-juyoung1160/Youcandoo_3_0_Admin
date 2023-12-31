<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Doit extends MY_Controller {

    public function index()
    {
        $this->load->layout('v1/doit/doit-list');
    }

    public function create()
    {
        $this->load->layout('v1/doit/doit-create');
    }

    public function detail()
    {
        $this->load->layout('v1/doit/doit-detail');
    }

    public function update()
    {
        $this->load->layout('v1/doit/doit-update');
    }

    public function info()
    {
        $this->load->layout('v1/doit/brand-doit-detail');
    }

    public function v2($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('v1/doit/doit-list-v2');
                break;
            case "detail" :
                $this->load->layout('v1/doit/doit-detail');
                break;
        }
    }

    // 추천두잇관리
    public function recommend()
    {
        $this->load->layout('v1/doit/doit-recommend-list');
    }

    // 추천두잇관리(그룹)
    public function recommends($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('v1/doit/doit-recommend-list-v2');
                break;
            case "create" :
                $this->load->layout('v1/doit/doit-recommend-create');
                break;
            case "update" :
                $this->load->layout('v1/doit/doit-recommend-update');
                break;
        }
    }

    public function category($Route = "")
    {
        switch ($Route) {
            case "":
                $this->load->layout('v1/doit/doit-category-list');
                break;
            case "create" :
                $this->load->layout('v1/doit/doit-category-create');
                break;
            case "detail" :
                $this->load->layout('v1/doit/doit-category-detail');
                break;
            case "update" :
                $this->load->layout('v1/doit/doit-category-update');
                break;
        }
     }

     public function talk($Route = "")
     {
         switch ($Route) {
             case "":
                 $this->load->layout('v1/doit/doit-talk-list');
                 break;
             case "detail" :
                 $this->load->layout('v1/doit/doit-talk-detail');
                 break;
         }
      }
}

