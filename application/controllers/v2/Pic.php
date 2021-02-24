<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pic extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/pic-doit/pic-doit-list');
    }

    public function create()
    {
        $this->load->template('v2/pic-doit/pic-doit-create');
    }
    public function update()
    {
        $this->load->template('v2/pic-doit/pic-doit-update');
    }

}