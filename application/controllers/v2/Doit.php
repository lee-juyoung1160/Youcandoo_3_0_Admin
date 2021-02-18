<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Doit extends MY_Controller {

    public function index()
        {
            $this->load->template('v2/doit/doit-list');
        }

public function create()
        {
            $this->load->template('v2/doit/doit-create');
        }
}


