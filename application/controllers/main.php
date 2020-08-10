<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Main extends MY_Controller {

	public function index()
	{
        $this->load->layout('main-dashboard');
	}

    public function login()
    {
        $this->load->view('login');
    }
}