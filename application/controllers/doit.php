<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Doit extends MY_Controller
{

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

public function category()
    {
        $this->load->layout('doit/doit-category-list');
    }
    /*
public function categoryListsCreate()
    {
        $this->load->layout('doit/doit-category-create');
    }
public function categoryListsDetail()
    {
        $this->load->layout('doit/doit-category-detail');
    }
public function categoryListsUpdate()
    {
        $this->load->layout('doit/doit-category-update');
    }
    */
}