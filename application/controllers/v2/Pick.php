<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pick extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/pick/pick-doit-list');
    }

    public function create()
    {
        $this->load->template('v2/pick/pick-doit-create');
    }

    public function update()
    {
        $this->load->template('v2/pick/pick-doit-update');
    }

}