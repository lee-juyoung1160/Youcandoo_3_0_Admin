<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Gift extends MY_Controller
{

    public function index()
    {
        $this->load->layout('gift/gift-list');
    }

    public function create()
    {
        $this->load->layout('gift/gift-create');
    }

    public function approval()
    {
        $this->load->layout('gift/gift-apply-list');
    }

}
