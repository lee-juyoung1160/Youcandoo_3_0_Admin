<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends MY_Controller {

    public function index()
        {
            $this->load->template('v2/category/category-list');
        }
    public function create()
        {
            $this->load->template('v2/category/category-create');
        }
    public function detail()
        {
            $this->load->template('v2/category/category-detail');
        }
    public function update()
        {
            $this->load->template('v2/category/category-update');
        }
}


