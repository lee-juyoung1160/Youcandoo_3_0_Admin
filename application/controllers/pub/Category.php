<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends MY_Controller {

    public function index()
    {
        $this->load->layout_v2('v2/category/category-list');
    }
}

