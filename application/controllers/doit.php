<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Doit extends CI_Controller {

    public function create()
	{
		$this->load->layout('doit/doit-create');
	}

    public function lists()
    {
        $this->load->layout('doit/doit-list');
    }

}